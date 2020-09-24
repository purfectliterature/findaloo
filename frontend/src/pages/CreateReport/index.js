import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  Navbar,
  NavRight,
  Button,
  List,
  ListItem,
  BlockTitle,
  ListInput,
  f7,
} from 'framework7-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ISSUES, ISSUE_NOT_WORKING, FEATURE_TO_TEXT } from '../../strings';

import { getTokens } from '../../store/user';
import { createReport } from '../../utils/reports';

const Report = (props) => {
  const { id, postTitle } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const userTokens = useSelector(getTokens);

  const onItemClicked = (item) => {
    if (selectedItems.includes(item)) {
      const remainingSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelectedItems(remainingSelectedItems);
      formik.setFieldValue('reportItems', remainingSelectedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
      formik.setFieldValue('reportItems', [...selectedItems, item]);
    }
  };

  const handleFormSubmission = async (values) => {
    const { reportIssue, reportItems, reportDescription } = values;

    createReport(
      userTokens.authToken,
      id,
      reportIssue,
      reportItems,
      reportDescription,
      (data) => {
        formik.setSubmitting(false);
        f7.views.main.router.navigate(`/toilets/${id}/`);
      },
      (err) => {
        formik.setSubmitting(false);
        console.log(err);
      }
    )
  };

  const validationSchema = Yup.object().shape({
    reportIssue: Yup.string().required(),
    reportItems: Yup.array()
      .required('Required')
      .min(1, 'An item must be provided'),
    reportDescription: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      reportIssue: ISSUE_NOT_WORKING,
      reportItems: selectedItems,
      reportDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmission(values);
    },
  });

  return (
    <Page className="white-background-skin">
      <form onSubmit={formik.handleSubmit}>
        <Navbar backLink title={postTitle}>
          <NavRight>
            <Button type="submit">Report</Button>
          </NavRight>
        </Navbar>

        <div className="margin">
          <BlockTitle>Issue</BlockTitle>
          <List>
            <ListItem
              title="Type"
              smartSelect
              smartSelectParams={{ openIn: 'sheet' }}
            >
              <select
                name="reportIssue"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('reportIssue')}
              >
                {ISSUES.map((issue, index) => (
                  <option key={index} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </ListItem>
          </List>
        </div>

        <div className="margin">
          <BlockTitle>Items</BlockTitle>
          <List>
            {Object.values(FEATURE_TO_TEXT).map((feature, index) => (
              <ListItem
                key={index}
                checkbox
                title={feature}
                name="reportItems"
                disabled={formik.isSubmitting}
                onClick={() => onItemClicked(feature)}
              />
            ))}
          </List>
        </div>

        <div className="margin">
          <BlockTitle>Description</BlockTitle>
          <List>
            <ListInput
              type="textarea"
              placeholder="Share with us in details what issue you faced at this toilet"
              clearButton
              floatingLabel
              disabled={formik.isSubmitting}
              {...formik.getFieldProps('reportDescription')}
            />
          </List>
        </div>
      </form>
    </Page>
  );
};

export default Report;
