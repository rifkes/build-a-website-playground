import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';

export const PRIVACY_POLICY = groq`
  *[_type == 'privacyPolicy'][0] {
    content[] {
      ${PORTABLE_TEXT}
    },
  }
`;