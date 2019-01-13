import PropTypes from 'prop-types';
import moment from 'moment';

// TODO rename calendar params to something more appropriate
const FormattedDate = ({ date, format, calendar }) => {
  const parsedDate = moment(date);

  if (calendar) {
    return parsedDate.calendar(moment(), {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      sameElse: format,
      lastWeek: format,
      nextWeek: format,
    });
  }

  return parsedDate.format(format);
};

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string,
  calendar: PropTypes.bool,
};

FormattedDate.defaultProps = {
  format: 'DD.MM.YYYY',
  calendar: false,
};

export default FormattedDate;
