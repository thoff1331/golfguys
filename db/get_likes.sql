update messages 

set likes = likes + 1
where id = $1;

select golfapp.username, messages.caption, golfapp.pp, messages.image, messages.id, messages.likes, messages.comments
from golfapp 
 inner join messages 
on golfapp.user_id = messages.user_id

order by id desc;
