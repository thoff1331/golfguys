update messages 

set comments = comments + 1
where id = $1;
returning *;