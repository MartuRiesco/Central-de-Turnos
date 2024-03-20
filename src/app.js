import {app} from './utils.js'
import indexRouter from './routes/api/index.router.js'

app.use('/', indexRouter )

export default app