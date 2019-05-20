import { Grid } from '../layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { inheritLink } from '../globals'

export const ItemGridContainer = styled(Grid)`
  grid-gap: ${themeGet('space.lg')}px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`

export const ItemGridLink = styled(Link)`
  ${inheritLink};
  
  &:hover,
  &:focus {
    ${inheritLink};
  }
`
