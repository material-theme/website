import 'what-input';
import { Application } from 'stimulus';

/* Import components */
import Preview from './components/preview';
import Contributors from './components/contributors';

/* Init Stimulus library */
const application = Application.start();

/* Register Stimulus controllers */
application.register('preview', Preview);
application.register('contributors', Contributors);

