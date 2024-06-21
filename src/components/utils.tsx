import styled from '@emotion/styled';

// Simple flex row
export const CenterRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const Row = styled.div({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'row',
  width: '100%',
  gap: 10
});

export const Column = styled.div({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  width: '100%',
  gap: 10
});

export const Tag = styled.span({
  display: 'inline-block',
  padding: '5px',
  marginRight: 5,
  borderRadius: '50%',
  backgroundColor: '#525252',
})
