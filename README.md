# Self-Note / Note-To-Self

Originally scoped to provide email/text message reminders to a user, has expanded to be able to send text/email to any email or phone. (texting requires reciever's carrier)
Currently supports AT&T, T-Mobile, Verizon, Sprint, and email.

## Getting Started

Clone this repo as well as the back-end component, found [here](https://github.com/Kinsiu00/selfNote_backend). <br>
In the backend root directory, run "npm install" to install the proper middleware and other needed components.

### Prerequisites

- Some knowledge of PostgreSQL
- A cellphone number with one of the supported carriers
- An email address

### Installing

NOTE: the current database needs to be configured to your database.
- In your terminal, run 'createdb {DATABASE}'
- In knexfile.js, change the connection to: 'postgres://localhost/{DATABASE}'.
  - on Linux and Windows systems, PostgreSQL may require a username/password for PostgreSQL. Please refer to PostgreSQL 
  documentation for details: https://www.postgresql.org/docs/10/static/client-authentication.html
  - ie: 'postgres://{USERNAME}:{PASSWORD}@localhost/{DATABASE NAME}'

Once the database and connection has been set up, simply run "npm start" in the root directory of the backend.

## How to use

Start by creating an entry. Date format is in YYYY/MM/DD, Time is in the 24hr style. (ie: 1644 is 4:44pm)
Once an entry has been logged, the server will check every minute until the time has elapse. At this point, the server will send the entry and clear the entry from the list.
NOTE: The entry will "remain" until the page is refreshed.

An entry can be edited at any time, keep in mind the date and time will reset to the current time. (to allow for easier measurement)

## Built With

* Javascript
* [SendGrid](https://sendgrid.com/) - service used to send messages.
* [PostgreSQL](https://rometools.github.io/rome/) - Used for the database.
* [Knex](https://knexjs.org/) - used for accessing database.

## Authors

Kin Siu - [Kinsiu00](https://github.com/Kinsiu00/)

## License


This project is licensed under the MIT License.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
