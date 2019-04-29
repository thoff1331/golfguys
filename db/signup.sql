INSERT INTO golfapp
    ( email,username, password)
VALUES
    ( $1, $2, $3)
RETURNING * ;