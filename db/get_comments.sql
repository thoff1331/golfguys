-- update messages 

-- set comments = comments + 1
-- where id = $1

select * from comment where post_id = $1