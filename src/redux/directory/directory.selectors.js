import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectionDirectorySection = createSelector(
    [selectDirectory],
    directory => directory.sections
);