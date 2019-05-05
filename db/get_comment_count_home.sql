select comment.post_id, messages.id
from messages
inner join comment on comment.post_id = messages.id

SELECT COUNT(*) from comment where post_id = $1;