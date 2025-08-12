# Graph Lab — 30+ function grapher (cartesian, parametric, polar, polygon)
import numpy as np
import matplotlib.pyplot as plt
from dataclasses import dataclass
from typing import Callable, Dict, List, Tuple, Optional

EPS = 1e-9

@dataclass
class Domain:
    kind: str  # 'cartesian', 'polar', 'parametric', 'polygon'
    start: float
    stop: float
    num: int = 2000

@dataclass
class FuncDef:
    fid: int
    name: str
    kind: str  # 'cartesian', 'polar', 'parametric', 'polygon'
    expr: str
    param_names: List[str]
    default_domain: Domain
    eval_fn: Callable[..., Tuple[np.ndarray, np.ndarray]]
    template_fn: Callable[[int], List[dict]]

def mask_invalid(x: np.ndarray, y: np.ndarray):
    m = np.isfinite(x) & np.isfinite(y)
    return x[m], y[m]

def to_xy_cartesian(x, y):
    return mask_invalid(x, y)

def to_xy_polar(theta, r):
    x = r*np.cos(theta); y = r*np.sin(theta)
    return mask_invalid(x, y)

# ---------- Template generators (same as in the notebook) ----------
import math

def linear_templates(n=10):
    vals=[]; 
    for i in range(n):
        a=(i-(n//2))*0.4+1.0; b=(i%3-1)*2.0
        vals.append({"a":a,"b":b})
    return vals

def quadratic_templates(n=10):
    vals=[]
    for i in range(n):
        a=0.5+0.2*i; b=(i%4-2)*0.8; c=(i%5-2)*1.2
        vals.append({"a":a,"b":b,"c":c})
    return vals

def cubic_templates(n=10):
    vals=[]; 
    for i in range(n):
        a=0.2+0.1*i; b=(i%5-2)*0.8
        vals.append({"a":a,"b":b})
    return vals

def quartic_templates(n=10):
    vals=[]
    for i in range(n):
        a=0.02+0.04*i; b=(i%5-2)*0.5; c=(i%3-1)*1.0
        vals.append({"a":a,"b":b,"c":c})
    return vals

def abs_templates(n=10):
    vals=[]
    for i in range(n):
        a=0.5+0.3*i; b=(i%5-2)*1.0
        vals.append({"a":a,"b":b})
    return vals

def exp_templates(n=10):
    vals=[]
    for i in range(n):
        a=1.0; b=-1.0+0.2*i; c=(i%3-1)*0.5
        vals.append({"a":a,"b":b,"c":c})
    return vals

def log_templates(n=10):
    vals=[]
    for i in range(n):
        a=1.0; b=0.5+0.1*i; c=max(0.1,(i%4)*0.5); d=(i%3-1)*0.5
        vals.append({"a":a,"b":b,"c":c,"d":d})
    return vals

def power_templates(n=10):
    exps=[0.5,1.5,2.5,3.0,0.8,1.2,2.2,2.8,3.5,1.7]
    return [{"a":1.0,"b":exps[i%len(exps)],"c":0.0} for i in range(n)]

def sine_templates(n=10):
    return [{"a":1.0,"b":0.5+i*0.5,"c":i*math.pi/10.0,"d":0.0} for i in range(n)]

def cos_sum_templates(n=10):
    combos=[(1,2),(2,3),(3,5),(1,5),(2,7),(3,7),(5,8),(5,9),(7,9),(8,13)]
    vals=[]
    for i in range(n):
        b,d=combos[i%len(combos)]
        vals.append({"a":1.0,"b":b,"c":0.6,"d":d})
    return vals

def damped_sine_templates(n=10):
    return [{"a":1.0,"b":0.05+0.05*i,"c":2+i} for i in range(n)]

def gaussian_templates(n=10):
    return [{"a":1.0,"b":(i%5-2)*1.0,"c":0.3+0.1*(i%5)} for i in range(n)]

def sinc_templates(n=10):
    return [{"a":1.0,"b":1.0+0.6*i,"c":1.0} for i in range(n)]

def logistic_templates(n=10):
    return [{"a":1.0,"b":2+0.5*i,"c":(i%5-2)*0.5,"d":0.0} for i in range(n)]

def tangent_templates(n=10):
    return [{"a":1.0,"b":0.5+0.3*i,"c":i*math.pi/12.0,"d":0.0} for i in range(n)]

def rational_templates(n=10):
    return [{"a":1.0,"b":0.2+0.2*i} for i in range(n)]

def circle_templates(n=10):
    return [{"a":0.5+0.1*i} for i in range(n)]

def ellipse_templates(n=10):
    vals=[]
    for i in range(n):
        vals.append({"a":1.0+0.2*(i%5),"b":0.5+0.1*((i+2)%5)})
    return vals

def lissajous_templates(n=10):
    pairs=[(1,2),(2,1),(2,3),(3,2),(3,4),(4,3),(3,5),(5,3),(5,4),(4,5)]
    vals=[]
    for i in range(n):
        p,q=pairs[i%len(pairs)]
        vals.append({"a":1.0,"b":1.0,"p":p,"q":q,"delta":(i%10)*math.pi/10.0})
    return vals

def hypotrochoid_templates(n=10):
    triples=[(5,3,5),(7,3,3),(8,3,5),(9,4,3),(10,3,5),(11,5,5),(12,5,3),(13,5,4),(14,3,6),(15,4,5)]
    return [{"R":float(R),"r":float(r),"d":float(d)} for (R,r,d) in triples[:n]]

def epicycloid_templates(n=10):
    pairs=[(3,1),(4,1),(5,1),(5,2),(6,1),(7,2),(7,3),(8,3),(9,2),(10,3)]
    vals=[]
    for R,r in pairs[:n]:
        vals.append({"R":float(R),"r":float(r),"d":float(r)})
    return vals

def spiral_param_templates(n=10):
    return [{"a":0.0,"b":0.05+0.02*i} for i in range(n)]

def superellipse_templates(n=10):
    exps=[2,2.5,3,3.5,4,1.5,5,6,2.2,2.8]
    vals=[]
    for i in range(n):
        vals.append({"a":1.0+0.2*(i%5),"b":1.0+0.2*((i+2)%5),"n":float(exps[i%len(exps)])})
    return vals

def rose_templates(n=10):
    ks=[3,4,5,6,7,8,9,10,11,12]
    return [{"a":1.0,"k":float(ks[i%len(ks)])} for i in range(n)]

def cardioid_templates(n=10):
    return [{"a":1.0+0.1*i} for i in range(n)]

def lemniscate_templates(n=10):
    return [{"a":1.0+0.1*i} for i in range(n)]

def log_spiral_templates(n=10):
    return [{"a":0.1,"b":0.1+0.05*i} for i in range(n)]

def hyperbolic_spiral_templates(n=10):
    return [{"a":1.0+0.2*i} for i in range(n)]

def arch_spiral_templates(n=10):
    return [{"a":0.0,"b":0.1+0.05*i} for i in range(n)]

def butterfly_templates(n=10):
    return [{"scale":1.0+0.1*i} for i in range(n)]

def hexagram_templates(n=10):
    vals=[]
    for i in range(n):
        vals.append({"scale":1.0+0.1*i,"rotation":i*(math.pi/30.0)})
    return vals

# ---------- Evaluators ----------
def eval_linear(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*x + p["b"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_quadratic(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*x**2 + p["b"]*x + p["c"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_cubic(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*x**3 + p["b"]*x; m=np.isfinite(y)
    return x[m], y[m]

def eval_quartic(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*x**4 + p["b"]*x**2 + p["c"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_abs(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.abs(x) + p["b"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_exp(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.exp(p["b"]*x) + p["c"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_log(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    z=p["b"]*x + p["c"]; z[z<=0]=np.nan
    y=p["a"]*np.log(z) + p["d"]
    m=np.isfinite(y)
    return x[m], y[m]

def eval_power(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.power(np.abs(x), p["b"]) + p["c"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_sine(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.sin(p["b"]*x + p["c"]) + p["d"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_cos_sum(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.cos(p["b"]*x) + p["c"]*np.cos(p["d"]*x); m=np.isfinite(y)
    return x[m], y[m]

def eval_damped_sine(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.exp(-p["b"]*np.abs(x))*np.sin(p["c"]*x); m=np.isfinite(y)
    return x[m], y[m]

def eval_gaussian(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.exp(-((x-p["b"])**2)/(2*(p["c"]**2+EPS))); m=np.isfinite(y)
    return x[m], y[m]

def eval_sinc(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*np.sin(p["b"]*x)/(p["c"]*x + EPS); m=np.isfinite(y)
    return x[m], y[m]

def eval_logistic(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]/(1+np.exp(-p["b"]*(x-p["c"]))) + p["d"]; m=np.isfinite(y)
    return x[m], y[m]

def eval_tangent(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    arg=p["b"]*x + p["c"]
    y=p["a"]*np.tan(arg) + p["d"]
    m=(np.abs(np.cos(arg))>0.02) & np.isfinite(y)
    return x[m], y[m]

def eval_rational(domain, p):
    x=np.linspace(domain.start, domain.stop, domain.num)
    y=p["a"]*x/(1+p["b"]*x**2); m=np.isfinite(y)
    return x[m], y[m]

# Parametric
def eval_circle(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    x=p["a"]*np.cos(t); y=p["a"]*np.sin(t)
    return x,y

def eval_ellipse(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    x=p["a"]*np.cos(t); y=p["b"]*np.sin(t)
    return x,y

def eval_lissajous(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    x=p["a"]*np.sin(p["p"]*t + p["delta"]); y=p["b"]*np.sin(p["q"]*t)
    return x,y

def eval_hypotrochoid(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    R,r,d=p["R"],p["r"],p["d"]
    k=(R-r)/(r+EPS)
    x=(R-r)*np.cos(t) + d*np.cos(k*t)
    y=(R-r)*np.sin(t) - d*np.sin(k*t)
    return x,y

def eval_epicycloid(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    R,r,d=p["R"],p["r"],p["d"]
    k=(R+r)/(r+EPS)
    x=(R+r)*np.cos(t) - d*np.cos(k*t)
    y=(R+r)*np.sin(t) - d*np.sin(k*t)
    return x,y

def eval_spiral_param(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"]+p["b"]*t
    x=r*np.cos(t); y=r*np.sin(t)
    return x,y

def eval_superellipse(domain, p):
    t=np.linspace(domain.start, domain.stop, domain.num)
    n=p["n"]
    x=p["a"]*np.sign(np.cos(t))*(np.abs(np.cos(t))**(2.0/(n+EPS)))
    y=p["b"]*np.sign(np.sin(t))*(np.abs(np.sin(t))**(2.0/(n+EPS)))
    return x,y

# Polar
def eval_rose(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"]*np.cos(p["k"]*th)
    x=r*np.cos(th); y=r*np.sin(th)
    return x,y

def eval_cardioid(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"]*(1-np.cos(th))
    x=r*np.cos(th); y=r*np.sin(th)
    return x,y

def eval_lemniscate(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    val=np.cos(2*th); val[val<0]=np.nan
    r=p["a"]*np.sqrt(val)
    x=r*np.cos(th); y=r*np.sin(th)
    m=np.isfinite(x) & np.isfinite(y)
    return x[m], y[m]

def eval_log_spiral(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"]*np.exp(p["b"]*th)
    x=r*np.cos(th); y=r*np.sin(th)
    return x,y

def eval_hyperbolic_spiral(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"]/(th + EPS)
    x=r*np.cos(th); y=r*np.sin(th)
    m=np.isfinite(x) & np.isfinite(y)
    return x[m], y[m]

def eval_arch_spiral(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=p["a"] + p["b"]*th
    x=r*np.cos(th); y=r*np.sin(th)
    return x,y

def eval_butterfly(domain, p):
    th=np.linspace(domain.start, domain.stop, domain.num)
    r=np.exp(np.sin(th)) - 2*np.cos(4*th) + np.sin((2*th-np.pi)/24.0)**5
    r*=p["scale"]
    x=r*np.cos(th); y=r*np.sin(th)
    return x,y

# Polygon hexagram
def hexagram_vertices(scale=1.0, rotation=0.0):
    R=1.0*scale; r=(np.sqrt(3)/3.0)*R
    verts=[]
    for k in range(12):
        ang=rotation + k*(np.pi/6.0)
        rad= R if (k%2==0) else r
        verts.append((rad*np.cos(ang), rad*np.sin(ang)))
    return np.array(verts)

def eval_hexagram(domain, p):
    verts=hexagram_vertices(p["scale"], p["rotation"])
    verts=np.vstack([verts, verts[0]])
    per_edge=max(2, domain.num//(len(verts)-1))
    segs=[]
    for i in range(len(verts)-1):
        x0,y0=verts[i]; x1,y1=verts[i+1]
        t=np.linspace(0,1,per_edge,endpoint=False)
        xs=x0+(x1-x0)*t; ys=y0+(y1-y0)*t
        segs.append(np.column_stack([xs,ys]))
    poly=np.vstack(segs)
    return poly[:,0], poly[:,1]

REGISTRY: Dict[int, FuncDef] = {}

def register(f): REGISTRY[f.fid]=f

# 1-16 Cartesian
register(FuncDef(1,"Linear","cartesian","y = a*x + b",["a","b"],Domain("cartesian",-10,10,1200),eval_linear,linear_templates))
register(FuncDef(2,"Quadratic","cartesian","y = a*x^2 + b*x + c",["a","b","c"],Domain("cartesian",-6,6,1400),eval_quadratic,quadratic_templates))
register(FuncDef(3,"Cubic (odd)","cartesian","y = a*x^3 + b*x",["a","b"],Domain("cartesian",-4,4,1400),eval_cubic,cubic_templates))
register(FuncDef(4,"Quartic (even-symmetric)","cartesian","y = a*x^4 + b*x^2 + c",["a","b","c"],Domain("cartesian",-3,3,1400),eval_quartic,quartic_templates))
register(FuncDef(5,"Absolute value","cartesian","y = a*|x| + b",["a","b"],Domain("cartesian",-10,10,1200),eval_abs,abs_templates))
register(FuncDef(6,"Exponential","cartesian","y = a*exp(b*x) + c",["a","b","c"],Domain("cartesian",-4,4,1600),eval_exp,exp_templates))
register(FuncDef(7,"Logarithm","cartesian","y = a*ln(b*x + c) + d",["a","b","c","d"],Domain("cartesian",-5,5,1600),eval_log,log_templates))
register(FuncDef(8,"Power (|x|^b)","cartesian","y = a*|x|^b + c",["a","b","c"],Domain("cartesian",-4,4,1400),eval_power,power_templates))
register(FuncDef(9,"Sine","cartesian","y = a*sin(b*x + c) + d",["a","b","c","d"],Domain("cartesian",-10,10,2000),eval_sine,sine_templates))
register(FuncDef(10,"Cosine sum","cartesian","y = a*cos(b*x) + c*cos(d*x)",["a","b","c","d"],Domain("cartesian",-15,15,2400),eval_cos_sum,cos_sum_templates))
register(FuncDef(11,"Damped sine","cartesian","y = a*exp(-b*|x|)*sin(c*x)",["a","b","c"],Domain("cartesian",-40,40,2600),eval_damped_sine,damped_sine_templates))
register(FuncDef(12,"Gaussian bell","cartesian","y = a*exp(-((x-b)^2)/(2*c^2))",["a","b","c"],Domain("cartesian",-6,6,1600),eval_gaussian,gaussian_templates))
register(FuncDef(13,"Sinc","cartesian","y = a*sin(b*x)/(c*x)",["a","b","c"],Domain("cartesian",-30,30,2800),eval_sinc,sinc_templates))
register(FuncDef(14,"Logistic (sigmoid)","cartesian","y = a/(1+exp(-b*(x-c))) + d",["a","b","c","d"],Domain("cartesian",-8,8,1600),eval_logistic,logistic_templates))
register(FuncDef(15,"Tangent","cartesian","y = a*tan(b*x + c) + d",["a","b","c","d"],Domain("cartesian",-6,6,2600),eval_tangent,tangent_templates))
register(FuncDef(16,"Rational","cartesian","y = a*x/(1 + b*x^2)",["a","b"],Domain("cartesian",-10,10,2000),eval_rational,rational_templates))

# 17-23 Parametric
register(FuncDef(17,"Circle","parametric","x=a*cos(t), y=a*sin(t)",["a"],Domain("parametric",0,2*np.pi,1600),eval_circle,circle_templates))
register(FuncDef(18,"Ellipse","parametric","x=a*cos(t), y=b*sin(t)",["a","b"],Domain("parametric",0,2*np.pi,1600),eval_ellipse,ellipse_templates))
register(FuncDef(19,"Lissajous","parametric","x=a*sin(p*t+δ), y=b*sin(q*t)",["a","b","p","q","delta"],Domain("parametric",0,2*np.pi,2400),eval_lissajous,lissajous_templates))
register(FuncDef(20,"Hypotrochoid (spiro)","parametric","x=(R-r)cos t + d cos((R-r)/r * t); y=(R-r)sin t - d sin((R-r)/r * t)",["R","r","d"],Domain("parametric",0,2*np.pi*24,4800),eval_hypotrochoid,hypotrochoid_templates))
register(FuncDef(21,"Epicycloid (spiro)","parametric","x=(R+r)cos t - d cos((R+r)/r * t); y=(R+r)sin t - d sin((R+r)/r * t)",["R","r","d"],Domain("parametric",0,2*np.pi*16,4000),eval_epicycloid,epicycloid_templates))
register(FuncDef(22,"Spiral (parametric)","parametric","x=(a+b*t)cos t, y=(a+b*t)sin t",["a","b"],Domain("parametric",0,12*np.pi,3600),eval_spiral_param,spiral_param_templates))
register(FuncDef(23,"Superellipse","parametric","superellipse |x/a|^n + |y/b|^n = 1",["a","b","n"],Domain("parametric",0,2*np.pi,2000),eval_superellipse,superellipse_templates))

# 24-30 Polar
register(FuncDef(24,"Rose curve","polar","r = a*cos(k*θ)",["a","k"],Domain("polar",0,2*np.pi,2400),eval_rose,rose_templates))
register(FuncDef(25,"Cardioid","polar","r = a*(1 - cos θ)",["a"],Domain("polar",0,2*np.pi,2000),eval_cardioid,cardioid_templates))
register(FuncDef(26,"Lemniscate of Bernoulli","polar","r = a*sqrt(cos(2θ))",["a"],Domain("polar",0,2*np.pi,2200),eval_lemniscate,lemniscate_templates))
register(FuncDef(27,"Logarithmic spiral","polar","r = a*exp(b*θ)",["a","b"],Domain("polar",0,6*np.pi,2400),eval_log_spiral,log_spiral_templates))
register(FuncDef(28,"Hyperbolic spiral","polar","r = a/θ",["a"],Domain("polar",0.1,10*np.pi,2400),eval_hyperbolic_spiral,hyperbolic_spiral_templates))
register(FuncDef(29,"Archimedean spiral","polar","r = a + b*θ",["a","b"],Domain("polar",0,8*np.pi,2400),eval_arch_spiral,arch_spiral_templates))
register(FuncDef(30,"Butterfly (polar)","polar","r = e^{sin θ} - 2 cos(4θ) + sin^5((2θ-π)/24)",["scale"],Domain("polar",0,12*np.pi,3600),eval_butterfly,butterfly_templates))

# 31 Polygon
register(FuncDef(31,"Hexagram (Star of David)","polygon","12-vertex star polygon (two equilateral triangles)",["scale","rotation"],Domain("polygon",0,1,2000),eval_hexagram,hexagram_templates))

def list_functions() -> str:
    lines=[]
    for fid in sorted(REGISTRY.keys()):
        f=REGISTRY[fid]
        lines.append(f"{fid:02d}. {f.name} [{f.kind}] :: {f.expr} :: params={f.param_names}")
    return "\n".join(lines)

def get_templates(fid:int, count:int=10):
    return REGISTRY[fid].template_fn(count)

def plot_function(fid:int, params:Optional[dict]=None, domain_override:Optional[tuple]=None,
                  show:bool=True, title:Optional[str]=None, save_path:Optional[str]=None):
    f=REGISTRY[fid]
    domain=f.default_domain
    if domain_override is not None:
        s,e,n=domain_override; domain=Domain(f.kind,float(s),float(e),int(n))
    if params is None:
        params=get_templates(fid,1)[0]
    x,y=f.eval_fn(domain, params)
    plt.figure(figsize=(7,7))
    plt.plot(x,y,linewidth=1.5)
    plt.axis('equal' if f.kind in ('parametric','polar','polygon') else 'auto')
    plt.grid(True,alpha=0.3)
    plt.title(title if title else f"{f.name}: {f.expr} | params={params}", fontsize=10)
    if save_path: plt.savefig(save_path,bbox_inches='tight',dpi=160)
    if show: plt.show()
    plt.close()

if __name__=="__main__":
    import argparse, json
    parser=argparse.ArgumentParser(description="Graph Lab CLI")
    parser.add_argument("--list",action="store_true")
    parser.add_argument("--func",type=int)
    parser.add_argument("--template",type=int,default=0)
    parser.add_argument("--params",type=str)
    parser.add_argument("--domain",type=str)
    parser.add_argument("--save",type=str)
    args=parser.parse_args()
    if args.list:
        print(list_functions()); raise SystemExit
    if args.func is None:
        print("Use --list and --func <id>"); raise SystemExit
    params=None
    if args.params:
        params=json.loads(args.params)
    else:
        params=get_templates(args.func,10)[max(0,min(9,args.template))]
    dom=None
    if args.domain:
        s,e,n=json.loads(args.domain); dom=(float(s),float(e),int(n))
    plot_function(args.func, params=params, domain_override=dom, show=True, save_path=args.save)
