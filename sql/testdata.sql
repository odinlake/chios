
REPLACE INTO people 
(`username`, `realname`, `adminrole`, `password`) 
VALUES
('csagan', 'Carl Sagan', 'instructor', 'foo'),
('emforster', 'E. M. Forster', 'instructor', 'bar'),
('ahuxley', 'Aldous Huxley', 'instructor', 'baz'),
('rserling', 'Rod Serling', 'instructor', 'widget');


REPLACE INTO recognitions 
(`username`, `recognition`, `date`, `by_user`, `using_password`) 
VALUES
('csagan', 'prone - safe', '1985-04-17 13:57', 'emforster', 'emfsecret123'),
('csagan', 'prone - qualified', '1986-04-17 13:57', 'emforster', 'emfsecret123'),
('csagan', 'prone - competent', '1987-04-17 13:57', 'emforster', 'emfsecret123'),
('csagan', 'prone - marksman', '1988-04-17 13:57', 'emforster', 'emfsecret123'),
('csagan', 'prone - expert', '1989-04-17 13:57', 'emforster', 'emfsecret123'),

('emforster', 'prone - safe', '1945-04-17 13:57', 'ahuxley', 'ahsecret123'),
('emforster', 'prone - qualified', '1946-04-17 13:57', 'ahuxley', 'ahsecret123'),
('emforster', 'prone - competent', '1947-04-17 13:57', 'ahuxley', 'ahsecret123'),
('emforster', 'prone - marksman', '1948-04-17 13:57', 'ahuxley', 'ahsecret123'),
('emforster', 'prone - expert', '1949-04-17 13:57', 'ahuxley', 'ahsecret123'),

('ahuxley', 'prone - safe', '1925-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'prone - qualified', '1926-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'prone - competent', '1927-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'prone - marksman', '1928-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'prone - expert', '1929-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'lwsr - safe', '1925-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'lwsr - qualified', '1926-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'lwsr - competent', '1927-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'lwsr - marksman', '1928-04-17 13:57', 'emforster', 'emfsecret123'),
('ahuxley', 'lwsr - expert', '1929-04-17 13:57', 'emforster', 'emfsecret123'),

('rserling', 'prone - safe', '1965-04-17 13:57', 'ahuxley', 'ahsecret123'),
('rserling', 'prone - qualified', '1966-04-17 13:57', 'ahuxley', 'ahsecret123'),
('rserling', 'prone - competent', '1967-04-17 13:57', 'ahuxley', 'ahsecret123'),
('rserling', 'prone - marksman', '1968-04-17 13:57', 'ahuxley', 'ahsecret123'),
('rserling', 'prone - expert', '1969-04-17 13:57', 'ahuxley', 'ahsecret123');
