package models

type Settings struct {
	Reactions []Reaction `json:"reactions"`
}

type Reaction struct {
	ID      string `json:"id"`
	User    string `json:"user"`
	Emoji   string `json:"emoji"`
	Scope   string `json:"scope"`
	Enabled bool   `json:"enabled"`
}
