package plugin

import (
	"github.com/mattermost/mattermost-server/v6/model"
)

func (p *Plugin) sendEphemeralPost(args *model.CommandArgs, text string) (*model.CommandResponse, *model.AppError) {
	post := &model.Post{
		UserId:    p.botUserID,
		ChannelId: args.ChannelId,
		Message:   text,
	}
	_ = p.API.SendEphemeralPost(args.UserId, post)

	return &model.CommandResponse{}, nil
}
