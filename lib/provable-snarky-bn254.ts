import { FieldBn254 } from '../../lib/core-bn254.js';
import { createDerivers } from './provable-generic.js';

// external API
export { provable };

const { provable } = createDerivers<FieldBn254>();
