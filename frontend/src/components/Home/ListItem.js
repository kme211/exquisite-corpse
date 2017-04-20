import React, { Component, PropTypes } from 'react'
import styled, {css} from 'styled-components'
import Icon from 'components/Icon'
import { colors } from 'components/globals'

const StyledListItem = styled.li`
  position: relative;
  display: block;
  padding: 1rem;
  background: white;
  margin: 0.5rem;
`

const Status = styled.p`
  text-align: center;
  font-size: 0.75rem;
`

const ShareLink = styled.a`
  background: white;
  border-radius: 10px;
  border: 1px solid ${colors.primary[2]};
  color: ${colors.primary[2]};
  padding: 0.5rem;
  text-decoration: none;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`

const ListItem = ({_id, status, url}) => {
  return (
    <StyledListItem>
      {status === 'complete' && <a href={url} target="_blank"><img src={url} height="250" alt="your masterpiece"/></a>}
      <Status>{status}</Status>
      {status === 'complete' && <ShareLink href="http://twitter.com"><Icon icon="social-twitter"/> Share</ShareLink>}
    </StyledListItem>
  )
}

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default ListItem