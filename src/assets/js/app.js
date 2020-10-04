import 'what-input'
import { Application } from 'stimulus'

/* Import controllers */
import Preview from './controllers/preview'

/* Init Stimulus library */
const application = Application.start()

/* Register Stimulus controllers */
application.register('preview', Preview)



