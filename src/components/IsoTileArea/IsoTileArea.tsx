import React, { useMemo } from 'react';
import { Coords } from 'src/types';
import { Svg } from 'src/components/Svg/Svg';
import { useIsoProjection } from 'src/hooks/useIsoProjection';

interface Props {
  from: Coords;
  to: Coords;
  origin?: Coords;
  fill?: string;
  cornerRadius?: number;
  stroke?: {
    width: number;
    color: string;
  };
}

export const IsoTileArea = ({
  from,
  to,
  fill = 'none',
  cornerRadius = 0,
  stroke
}: Props) => {
  const { css, pxSize } = useIsoProjection({
    from,
    to
  });

  const strokeParams = useMemo(() => {
    if (!stroke) return {};

    return {
      stroke: stroke.color,
      strokeWidth: stroke.width
    };
  }, [stroke]);

  const points = useMemo(() => {
    const { width, height } = pxSize;
    return [
      `${width / 2},0`,
      `${width},${height / 4}`,
      `${width},${height * 0.75}`,
      `${width / 2},${height}`,
      `0,${height * 0.75}`,
      `0,${height / 4}`
    ].join(' ');
  }, [pxSize.width, pxSize.height]);

  return (
    <Svg viewboxSize={pxSize} style={css}>
      <polygon
        points={points}
        fill={fill}
        {...strokeParams}
        strokeLinejoin="round"
      />
    </Svg>
  );
};
