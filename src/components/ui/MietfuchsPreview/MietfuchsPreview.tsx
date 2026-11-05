import ThemedProjectPreview from '../ThemedProjectPreview/ThemedProjectPreview';
import light from '../../../../public/portfolio/mietfuchs-light.jpg';
import dark from '../../../../public/portfolio/mietfuchs-dark.jpg';

export default function MietfuchsPreview() {
  return <ThemedProjectPreview title="MietFuchs" domain="mietfuchs.primaflow.de" light={light} dark={dark} />;
}
