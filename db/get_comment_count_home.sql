select comment.post_id, messages.id
from messages
inner join comment on comment.post_id = messages.id