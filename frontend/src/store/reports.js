import { createSlice } from '@reduxjs/toolkit';
import Routes from '../utils/routes';

const initialState = {
  newReports: {},
};

const slice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addNewReport: {
      reducer(state, action) {
        state.newReports[action.payload.toiletId] = action.payload.report;
      },
      prepare(toiletId, authToken, report) {
        return {
          payload: { toiletId, report },
          meta: {
            offline: {
              effect: {
                url: `${Routes.toiletReport}/${toiletId}`,
                method: 'POST',
                body: JSON.stringify({
                  issue: report.issue,
                  description: report.description,
                  items: report.items,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${authToken}`,
                },
              },
              commit: { type: 'reports/clearReport', meta: { toiletId } },
            },
          },
        };
      },
    },
    clearReport: (state, action) => {
      delete state.newReports[action.meta.toiletId];
    },
  },
});

export const { addNewReport, clearReport } = slice.actions;

export default slice.reducer;