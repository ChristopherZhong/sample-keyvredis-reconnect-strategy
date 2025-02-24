# sample-keyvredis-reconnect-strategy

## Steps to reproduce the issue
1. Start Redis which can be reached at localhost at port 6379.
2. Run the code as follows.
```shell
node index.js
```
3. Output to the console should be as follows and in a waiting state.
```shell
{ set: true }
{ get: 'value' }
```
4. Stop Redis. Output to the console should be as follows.
```shell
{
  message: 'Not emitting the error',
  error: 'SocketClosedUnexpectedlyError'
}
{
  message: 'Retrying (0) connection to Redis in 1000 milliseconds ...'
}
{ message: 'Not emitting the error', error: 'Error' }
{
  message: 'Retrying (0) connection to Redis in 1000 milliseconds ...'
}
{ message: 'Not emitting the error', error: 'Error' }
{
  message: 'Retrying (1) connection to Redis in 1000 milliseconds ...'
}
{ message: 'Not emitting the error', error: 'AggregateError' }
{
  message: 'Retrying (2) connection to Redis in 1000 milliseconds ...'
}
{ message: 'Not emitting the error', error: 'AggregateError' }
{
  message: 'Retrying (3) connection to Redis in 1000 milliseconds ...'
}
{ message: 'Not emitting the error', error: 'AggregateError' }
```
