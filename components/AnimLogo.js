import styled from '@emotion/styled'

export default function AnimLogo() {
  return (
    <AnimationSection>
      <span>{'Chit-Chat'}</span>
    </AnimationSection>
  )
}

const AnimationSection = styled.div({
  fontSize: '24px',
  fontWeight: 'bold',
  animation: 'logoAnim 3s ease infinite',
  color: 'rgb(128 90 213)',
})
