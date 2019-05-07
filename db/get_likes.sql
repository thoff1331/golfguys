update messages 

set likes = likes + 1
where id = $1;
SELECT * from messages

order by id  asc;