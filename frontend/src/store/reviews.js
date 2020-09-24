import { createSlice } from '@reduxjs/toolkit';
import Routes from '../utils/routes';

const initialState = {
  newReviews: {},
};

const slice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addNewReviews: {
      reducer(state, action) {
        state.newReviews[action.payload.toiletId] = action.payload.review;
      },
      prepare(toiletId, authToken, review) {
        return {
          payload: { toiletId, review },
          meta: {
            offline: {
              effect: {
                url: `${Routes.toiletReview}/${toiletId}`,
                method: 'POST',
                body: JSON.stringify({
                  title: review.title,
                  description: review.description,
                  cleanlinessRating: review.rating,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${authToken}`,
                },
              },
              commit: { type: 'reviews/clearReview', meta: { toiletId } },
            },
          },
        };
      },
    },
    clearReview: (state, action) => {
      delete state.newReviews[action.meta.toiletId];
    },
  },
});

export const { addNewReviews, clearReview } = slice.actions;

export default slice.reducer;
