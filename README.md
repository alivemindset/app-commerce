# app-commerce
App to selective process

# Run application
Node Version: * 12.15.0 (Currently using 64-bit executable)

Clone the repository to local machine and run command below to install dependencies
<pre><code> yarn </pre></code>

Rename .env.example to .env and fill the inputs

Run the command below to create migrations, but first, create a database with name app-commerce or name seted in .env
<pre><code> yarn typeorm migration:run  </pre></code>

After complete the above commands, run in dev: 
<pre><code> yarn dev  </pre></code>

Or run build:
<pre><code> yarn build  </pre></code>
And run in production mode:
<pre><code> yarn start  </pre></code>

For run in production mode, set the .env ENVIRONMENT=production