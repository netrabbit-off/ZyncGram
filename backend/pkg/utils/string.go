package utils

import "strings"

func UniqueCharacters(input string) string {
	seen := make(map[rune]bool)
	var result strings.Builder

	for _, char := range input {
		if !seen[char] {
			seen[char] = true
			result.WriteRune(char)
		}
	}

	return result.String()
}
