


update golfapp  set course = $1 where username = $5;
update golfapp  set  handicap = $2 where username = $5;
update golfapp  set rounds = $3 where username = $5;
update golfapp  set career = $4 where username = $5;

SELECT * from golfapp where username = $5;
