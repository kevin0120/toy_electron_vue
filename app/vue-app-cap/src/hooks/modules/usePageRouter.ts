import { useRouter } from 'vue-router';
import { ROUTER_PATH, MOBILE_ROUTER_PATH } from '/@/router/constant';

export function usePageRouter() {
  const router = useRouter();

  const routerToBoxSetReferenceCurve = (boltName: string) => {
    router.push({
      path: `${ROUTER_PATH.boxReferenceCurve}/${boltName}`
    });
  };

  const routerToBoxAnalysis = (boltName: string) => {
    router.push({
      path: `${ROUTER_PATH.boxAnalysis}/${boltName}`
    });
  };

  const routerToCurveAnalysis = (curvesId: string) => {
    router.push({
      path: `${ROUTER_PATH.curveAnalysis}/${curvesId}`
    });
  };

  const routerToWorkstationMonitor = (workCenterCode: string) => {
    router.push({
      path: `${ROUTER_PATH.workstationMonitor}/workstations/${workCenterCode}`
    });
  };

  const routerToCurveComparison = (boltName: string, curveId = '') => {
    router.push({
      path: `${ROUTER_PATH.curveComparison}/${boltName}`,
      query: { id: curveId }
    });
  };
  return {
    router,
    routerToBoxSetReferenceCurve,
    routerToBoxAnalysis,
    routerToCurveAnalysis,
    routerToWorkstationMonitor,
    routerToCurveComparison
  };
}

export function useMobilePageRouter() {
  const router = useRouter();
  const routerToLogin = () => {
    router.replace(MOBILE_ROUTER_PATH.login);
  };
  const routerToWorkstationList = () => {
    router.replace(MOBILE_ROUTER_PATH.workstationList);
  };
  return {
    router,
    routerToLogin,
    routerToWorkstationList
  };
}
