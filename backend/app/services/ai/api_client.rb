require 'net/http'
require 'uri'

module Ai
  class ApiClient
    BASE_URL = "https://openrouter.ai/api/v1".freeze
    MODEL = "google/gemini-2.5-flash".freeze

    class ApiError < StandardError; end

    def self.generate(prompt, system: nil, max_tokens:1000)
      messages = []
      messages << { role: "system", content: system } if system
      messages << { role: "user", content: prompt }

      response = post("chat/completions", {
        model: MODEL,
        messages: messages,
        max_tokens: max_tokens
      })

      {
        result: response.dig("choices", 0, "message", "content"),
        confidence: response.dig("router", "confidence"),
        action_sequence: response.dig("router", "action_sequence"),
        planning_ms: response.dig("router", "planning_time_ms"),
        raw: response
      }
    end

    def self.rollout(steps:, context:, max_tokens: 1000)
      post("/rollout", {
        model: MODEL,
        steps: steps,
        context: context,
        max_tokens: max_tokens
      })
    end

    private

    def self.post(path, body)
      uri  = URI("#{BASE_URL}/#{path}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.read_timeout = 30
      http.open_timeout = 10

      request = Net::HTTP::Post.new(uri)
      request["Authorization"] = "Bearer #{ENV["OPENROUTER_API_KEY"]}"
      request["Content-Type"] = "application/json"
      # request["HTTP-Referer"] = "https://seusite.com" # To be added
      request["X-Title"] = "Forge AI"
      request.body = body.to_json

      response = http.request(request)
      
      puts "STATUS: #{response.code}"
      puts "BODY: #{response.body[0..500]}"
      
      parsed = JSON.parse(response.body)

      unless response.is_a?(Net::HTTPSuccess)
        raise ApiError, "Router API error: #{response.code}: #{parsed.dig("error", "message")}"
      end

      parsed
    end

    def self.api_key
      ENV["OPENROUTER_API_KEY"] || Rails.application.credentials.api_key
    end
  end
end