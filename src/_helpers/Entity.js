import { uniqueId } from 'underscore';

class Entity {
  constructor({ cv_id, inputsMetadata, cvLabelIdx }) {
    this.cvLabelIdx = cvLabelIdx;
    this.id = uniqueId('entity_');
    this.cv_id = cv_id;
    this.isTouched = false;
    for (let data of inputsMetadata) {
      this[data.name] = '';
    }
  }
}

export default Entity;
