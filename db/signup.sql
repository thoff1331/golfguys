INSERT INTO golfapp
    ( pp,username, password)
VALUES
    ( $1, $2, $3)
RETURNING * ;