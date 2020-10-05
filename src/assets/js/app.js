import 'what-input';
import { Application } from 'stimulus';

/* Import components */
import Preview from './components/preview';

/* Init Stimulus library */
const application = Application.start();

/* Register Stimulus controllers */
application.register('preview', Preview);

