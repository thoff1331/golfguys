select golfapp.username, messages.caption, golfapp.pp, messages.image, messages.id, messages.likes, messages.comments
from golfapp 
 inner join messages 
on golfapp.user_id = messages.user_id

