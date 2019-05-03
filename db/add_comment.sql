insert into comment (author, content, post_id)
values ($1,$2,$3)
RETURNING *;
