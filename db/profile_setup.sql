


update golfapp  set course = $1 where user_id = $5;
update golfapp  set  handicap = $2 where user_id = $5;
update golfapp  set rounds = $3 where user_id = $5;
update golfapp  set career = $4 where user_id = $5;

SELECT * from golfapp where user_id = $5;
