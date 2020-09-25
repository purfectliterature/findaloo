import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Page,
  Navbar,
  NavRight,
  NavLeft,
  NavTitle,
  Button,
  List,
  ListItem,
  BlockTitle,
  ListInput,
  f7,
} from 'framework7-react';
import { ArrowBackIos } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ISSUES, ISSUE_NOT_WORKING, FEATURE_TO_TEXT } from '../../strings';
import './styles.css';

import { getTokens } from '../../store/user';
import { addNewReport } from '../../store/reports';

const Report = (props) => {
  const { id, postTitle } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const userTokens = useSelector(getTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userTokens || !userTokens.authToken) {
      f7.views.main.router.navigate('/');
      return;
    }
  }, []);

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

    const report = {
      issue: reportIssue,
      items: reportItems,
      description: reportDescription,
    };
    dispatch(addNewReport(id, userTokens.authToken, report));

    formik.setSubmitting(false);
    f7.views.main.router.navigate(`/toilets/${id}/`);
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
    <Page className="create-report-page white-background-skin">
      <form onSubmit={formik.handleSubmit}>
        <Navbar>
          <NavLeft>
            <Button
              onClick={() => {
                f7.views.main.router.navigate(`/toilets/${id}/`, {
                  animate: false,
                });
              }}
            >
              <ArrowBackIos />
            </Button>
          </NavLeft>
          <NavTitle>{postTitle}</NavTitle>
          <NavRight>
            <Button type="submit" disabled={formik.isSubmitting}>
              Report
            </Button>
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
