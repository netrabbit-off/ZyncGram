package models

type Settings struct {
	Reactions []Reaction `json:"reactions"`
}

type Reaction struct {
	UserID   int    `json:"userid"`
	UserName string `json:"username"`
	Emoji    string `json:"emoji"`
}
