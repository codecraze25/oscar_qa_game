import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { green500, red500} from 'material-ui/styles/colors';

const QAResultItem = ({ questionText, correctness }) => {
  const icon = (correctness ? <ActionDone color={green500} /> : <ContentClear color={red500} />);

  return (
    <ListItem className="list-item" leftIcon={icon}>
      <h4 dangerouslySetInnerHTML={{__html: questionText}} />
    </ListItem>
  );
}

QAResultItem.propTypes = {
  questionText: PropTypes.string,
  correctness: PropTypes.bool
};

export default QAResultItem;
