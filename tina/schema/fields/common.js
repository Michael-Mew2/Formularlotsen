import { groupIdField } from "./layout/groupId";
import { createGroupStyleField } from "./layout/groupStyle";
import { positionField } from "./layout/position";
import { visibleField } from "./layout/visible";

export const commonFields = [
  visibleField,

  groupIdField,

  createGroupStyleField(),

  positionField,
];
