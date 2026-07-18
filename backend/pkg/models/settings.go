package models

type Settings struct {
	Animate   AnimateSettings `json:"animate"`
	Laugh     []bool          `json:"laugh"` // [privateEnabled bool, groupEnabled bool]
	AntiSpam  bool            `json:"antispam"`
	Reactions []Reaction      `json:"reactions"`
}

type AnimateSettings struct {
	Words     []string `json:"words"`
	IsEnabled []bool   `json:"enabled"` // [privateEnabled bool, groupEnabled bool]
}

type Reaction struct {
	ID      string `json:"id"`
	User    string `json:"user"`
	Emoji   string `json:"emoji"`
	Scope   string `json:"scope"`
	Enabled bool   `json:"enabled"`
}
