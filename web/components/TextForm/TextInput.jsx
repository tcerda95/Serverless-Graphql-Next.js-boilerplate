import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  display: block;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  height: 2em;
  text-align: left;
`;

const Tooltip = styled.small`
  color: gray;
  display: block;
  font-size: 0.75em;
  margin-top: 5px;
`;

const TextInput = ({ name, label, tooltip, className, ...props }) => (
  <Container className={className}>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} {...props} />
    {tooltip && <Tooltip>{tooltip}</Tooltip>}
  </Container>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  className: PropTypes.string
};

TextInput.defaultProps = {
  tooltip: '',
  className: ''
};

export default TextInput;
