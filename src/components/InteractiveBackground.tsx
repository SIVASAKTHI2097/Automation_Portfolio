import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
};

function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let resizeTimeout: number | null = null;

    let viewportWidth = 0;
    let viewportHeight = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const VIRTUAL_HEIGHT_MULTIPLIER = 1.9; // whole page feel
    let virtualHeight = 0;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
      inHero: false,
    };

    let points: NodePoint[] = [];

    const getDocumentHeight = () =>
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );

    const getVirtualHeight = () =>
      Math.max(getDocumentHeight(), window.innerHeight * VIRTUAL_HEIGHT_MULTIPLIER);

    // DENSER THAN BEFORE
    const getPointCount = (w: number, h: number) => {
      const area = w * h;

      if (w <= 640) return Math.min(520, Math.max(320, Math.floor(area / 4200)));
      if (area < 900000) return 650;
      if (area < 1800000) return 850;
      if (area < 3200000) return 1050;
      return 1250;
    };

    const createPoints = (targetWidth: number, targetVirtualHeight: number) => {
      const count = getPointCount(targetWidth, targetVirtualHeight);

      points = Array.from({ length: count }, () => {
        const baseVx = (Math.random() - 0.5) * 0.22; // faster
        const baseVy = (Math.random() - 0.5) * 0.22; // faster

        return {
          x: Math.random() * targetWidth,
          y: Math.random() * targetVirtualHeight,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size: Math.random() * 0.34 + 0.16, // smaller dots
        };
      });
    };

    const setCanvasSize = (targetWidth: number, targetHeight: number) => {
      viewportWidth = targetWidth;
      viewportHeight = targetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewportWidth * dpr);
      canvas.height = Math.floor(viewportHeight * dpr);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initialize = () => {
      const initialWidth = window.innerWidth;
      const initialHeight = window.innerHeight;

      virtualHeight = getVirtualHeight();

      setCanvasSize(initialWidth, initialHeight);
      createPoints(initialWidth, virtualHeight);
    };

const extendVirtualFieldWithoutReset = () => {
  const nextWidth = window.innerWidth;
  const nextVirtualHeight = getVirtualHeight();

  const prevWidth = viewportWidth;
  const prevVirtualHeight = virtualHeight;

  const widthChanged = nextWidth !== prevWidth;
  const heightIncreased = nextVirtualHeight > prevVirtualHeight;

  setCanvasSize(nextWidth, window.innerHeight);

  // IMPORTANT: proportionally remap all existing points
  if (widthChanged && prevWidth > 0) {
    const widthRatio = nextWidth / prevWidth;

    points.forEach((point) => {
      point.x *= widthRatio;

      // keep inside safe bounds after scaling
      if (point.x < 0) point.x = 0;
      if (point.x > nextWidth) point.x = nextWidth;
    });
  }

  // Also remap Y if virtual field height changed
  if (nextVirtualHeight !== prevVirtualHeight && prevVirtualHeight > 0) {
    const heightRatio = nextVirtualHeight / prevVirtualHeight;

    points.forEach((point) => {
      point.y *= heightRatio;

      if (point.y < 0) point.y = 0;
      if (point.y > nextVirtualHeight) point.y = nextVirtualHeight;
    });
  }

  // add more points only if height increases a lot after expansion
  if (heightIncreased) {
    const additionalArea = nextWidth * (nextVirtualHeight - prevVirtualHeight);
    const densityDivisor = window.innerWidth <= 640 ? 4200 : 5000;
    const extraCount = Math.max(20, Math.floor(additionalArea / densityDivisor));

    const newPoints: NodePoint[] = Array.from({ length: extraCount }, () => {
      const baseVx = (Math.random() - 0.5) * 0.22;
      const baseVy = (Math.random() - 0.5) * 0.22;

      return {
        x: Math.random() * nextWidth,
        y: prevVirtualHeight + Math.random() * (nextVirtualHeight - prevVirtualHeight),
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        size: Math.random() * 0.34 + 0.16,
      };
    });

    points.push(...newPoints);
  }

  virtualHeight = nextVirtualHeight;
};

    const getHeroBounds = () => {
      const hero = document.getElementById("hero");
      if (!hero) return null;

      const top = hero.offsetTop;
      const bottom = top + hero.offsetHeight;

      return { top, bottom };
    };

    const isPointInHeroZone = (
      point: NodePoint,
      heroBounds: { top: number; bottom: number } | null
    ) => {
      if (!heroBounds) return false;
      return point.y >= heroBounds.top && point.y <= heroBounds.bottom;
    };

    const getNearestConnections = (
      point: NodePoint,
      index: number,
      maxNeighbors: number,
      maxDistance: number
    ) => {
      const candidates: { index: number; distance: number }[] = [];

      for (let i = 0; i < points.length; i += 1) {
        if (i === index) continue;

        const other = points[i];
        const dx = point.x - other.x;
        const dy = point.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= maxDistance) {
          candidates.push({ index: i, distance });
        }
      }

      candidates.sort((a, b) => a.distance - b.distance);
      return candidates.slice(0, maxNeighbors);
    };

    const drawPersistentMesh = (scrollY: number) => {
      const heroBounds = getHeroBounds();

      for (let i = 0; i < points.length; i += 1) {
        const p1 = points[i];
        const screenY1 = p1.y - scrollY;

        if (screenY1 < -160 || screenY1 > viewportHeight + 160) continue;

        const p1InHero = isPointInHeroZone(p1, heroBounds);

        const maxNeighbors = p1InHero ? 8 : 7;
        const maxDistance = p1InHero
          ? window.innerWidth <= 768
            ? 115
            : 145
          : window.innerWidth <= 768
          ? 90
          : 115;

        const nearest = getNearestConnections(p1, i, maxNeighbors, maxDistance);

        nearest.forEach(({ index: neighborIndex, distance }) => {
          if (neighborIndex < i) return;

          const p2 = points[neighborIndex];
          const screenY2 = p2.y - scrollY;

          if (screenY2 < -160 || screenY2 > viewportHeight + 160) return;

          const p2InHero = isPointInHeroZone(p2, heroBounds);
          const inHeroPair = p1InHero && p2InHero;

          const intensity = 1 - distance / maxDistance;

          const opacity = inHeroPair
            ? 0.075 + intensity * 0.16
            : 0.05 + intensity * 0.12;

          ctx.beginPath();
          ctx.moveTo(p1.x, screenY1);
          ctx.lineTo(p2.x, screenY2);
          ctx.strokeStyle = `rgba(132, 233, 255, ${opacity})`;
          ctx.lineWidth = inHeroPair ? 0.74 : 0.56;
          ctx.stroke();
        });
      }
    };

    const drawHeroMouseConnections = (scrollY: number) => {
      if (!mouse.active || !mouse.inHero) return;

      const heroBounds = getHeroBounds();
      const cursorRadius = window.innerWidth <= 768 ? 140 : 180;

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];

        if (!isPointInHeroZone(point, heroBounds)) continue;

        const screenY = point.y - scrollY;
        if (screenY < -120 || screenY > viewportHeight + 120) continue;

        const dx = point.x - mouse.x;
        const dy = screenY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorRadius) {
          const opacity = (1 - distance / cursorRadius) * 0.22;

          ctx.beginPath();
          ctx.moveTo(point.x, screenY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(132, 233, 255, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    };

    const drawPoints = (scrollY: number) => {
      const heroBounds = getHeroBounds();

      points.forEach((point) => {
        const screenY = point.y - scrollY;
        if (screenY < -120 || screenY > viewportHeight + 120) return;

        const inHero = isPointInHeroZone(point, heroBounds);

        ctx.beginPath();
        ctx.arc(point.x, screenY, inHero ? point.size + 0.04 : point.size, 0, Math.PI * 2);
        ctx.fillStyle = inHero
          ? "rgba(170, 244, 255, 0.62)"
          : "rgba(150, 236, 255, 0.38)";
        ctx.fill();
      });
    };

    const updatePoints = () => {
      const heroBounds = getHeroBounds();
      const heroInfluenceRadius = window.innerWidth <= 768 ? 115 : 150;

      points.forEach((point) => {
        point.vx += (point.baseVx - point.vx) * 0.03;
        point.vy += (point.baseVy - point.vy) * 0.03;

        if (mouse.active && mouse.inHero && isPointInHeroZone(point, heroBounds)) {
          const heroScrollY = window.scrollY;
          const screenY = point.y - heroScrollY;

          const dx = mouse.x - point.x;
          const dy = mouse.y - screenY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < heroInfluenceRadius && distance > 0.001) {
            const force = (1 - distance / heroInfluenceRadius) * 0.07;
            point.vx += (dx / distance) * force;
            point.vy += (dy / distance) * force;
          }
        }

        point.x += point.vx;
        point.y += point.vy;

        if (point.x <= -12) point.x = viewportWidth + 12;
        if (point.x >= viewportWidth + 12) point.x = -12;

        if (point.y <= -12) point.y = virtualHeight + 12;
        if (point.y >= virtualHeight + 12) point.y = -12;
      });
    };

    const render = () => {
      const scrollY = window.scrollY;

      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      updatePoints();
      drawPersistentMesh(scrollY);
      drawHeroMouseConnections(scrollY);
      drawPoints(scrollY);

      animationFrameId = window.requestAnimationFrame(render);
    };

    const updateHeroMouseState = (clientX: number, clientY: number) => {
      const hero = document.getElementById("hero");

      if (!hero) {
        mouse.inHero = false;
        return;
      }

      const rect = hero.getBoundingClientRect();

      mouse.inHero =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      updateHeroMouseState(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.inHero = false;
    };

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        extendVirtualFieldWithoutReset();
      }, 100);
    };

    initialize();
    render();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const heightWatcher = window.setInterval(() => {
      const nextVirtualHeight = getVirtualHeight();
      if (nextVirtualHeight > virtualHeight + 40) {
        extendVirtualFieldWithoutReset();
      }
    }, 1200);

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      window.clearInterval(heightWatcher);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-bg-canvas"
      aria-hidden="true"
    />
  );
}

export default InteractiveBackground;