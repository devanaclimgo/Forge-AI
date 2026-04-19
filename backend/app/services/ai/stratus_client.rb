require 'net/http'
require 'uri'

module Ai
  class StratusClient
    BASE_URL = "https://api.stratus.run/v1".freeze
    MODEL = "stratus-x1ac-base-claude-sonnet-4-5".freeze

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
        confidence: response.dig("stratus", "confidence"),
        action_sequence: response.dig("stratus", "action_sequence"),
        planning_ms: response.dig("stratus", "planning_time_ms"),
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
      uri =URI("#{BASE_URL}/#{path}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.read_timeout = 30
      http.open_timeout = 10

      request = Net::HTTP::Post.new(uri)
      request["Authorization"] = "Bearer #{api_key}"
      request["Content-Type"] = "application/json"
      request.body = body.to_json

      response = http.request(request)
      parsed = JSON.parse(response.body)

      unless response.is_a?(Net::HTTPSuccess)
        raise ApiError, "Stratus API error: #{response.code}: #{parsed.dig("error", "message")}"
      end

      parsed
    end

    def self.api_key
      ENV["STRATUS_API_KEY"] || Rails.application.credentials.stratus_api_key
    end
  end
end