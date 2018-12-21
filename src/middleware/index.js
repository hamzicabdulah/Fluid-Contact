import { applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default applyMiddleware(reduxImmutableStateInvariant());