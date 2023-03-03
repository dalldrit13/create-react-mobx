import { makeAutoObservable, runInAction } from "mobx";
/* @ts-ignore */
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { Creds, RouterLocation, User } from "../types";
import Realtime from "./realtime";

class State {
  loading: Array<string>;
  readonly is_mobile: boolean;
  readonly is_apple: boolean;
  redirect: string | false;
  user: User | false;
  api: Axios;
  url: RouterLocation;
  realtime: Realtime | false;

  constructor() {
    this.is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.is_apple = /Apple/i.test(navigator.userAgent);

    this.loading = []; // Global Loading indicator objects pushed { type: '', mask: true/false  }
    this.redirect = false; // Will redirect to path

    this.user = false;
    this.url = { pathname: "", search: "", hash: "", key: "" };

    makeAutoObservable(this); // All attributes above observed by mobx

    /* @ts-ignore */
    this.api = new Axios({ ...axios.defaults, baseURL: import.meta.env.VITE_APP_API_URL, withCredentials: true }); // Reference API to use elsewhere in app
    
    // Intercept responses and log user out on 401 status
    this.api.interceptors.response.use(
      (res: any) => res,
      (err: any) => {
        if (401 === err.response.status) {
          toast.remove();
        } else {
          return Promise.reject(err);
        }
      }
    );
    this.realtime = false;
  }

  // Clears all user specific state values
  _resetState(): void {
    this.user = false;
    this.realtime = false;
  }

  location(url: any): void {
    this.url = url;
  }

  protected(load_str: string): boolean {
    if (!this.user) return true;
    if (load_str && this.isLoading(load_str)) return true;
    return false;
  }

  //________________________Loading Utilities___________________________________
  // Remove items from loading queue
  loaded(caller: string): void {
    runInAction(() => {
      const ind = this.loading.findIndex(load => load == caller);
      if (ind == -1) return;
      this.loading.splice(ind, 1);
    });
  }

  // Check if key in loading arr
  isLoading(call: string): boolean {
    return this.loading.some(l => l == call);
  }

  //________________________Redirect Handler____________________________________
  clearRedirect() {
    this.redirect = false;
  }

  //________________________Authentication______________________________________
  // Email pass signup
  _setUser({ data, toastId }: { data: any; toastId: string }) {
    if (data.unVerified) {
      runInAction(() => (this.redirect = "/confirm-account"));
      return;
    }
    if (!this.realtime) {
      this.realtime = new Realtime(this);
    }
    runInAction(() => {
      this.user = data.data || {};
      if (data.data?.onboard) {
        this.redirect = "/onboard";
      } else {
        this.redirect = "/home";
      }
    });
    toastId && toast.success(`Welcome${data.data?.onboard ? "" : " Back!"}`, { id: toastId, icon: "👋" });
  }

  async signup(creds: Creds) {
    if (this.isLoading("signup")) return;
    this.loading.push("signup");
    try {
      await this.api.post("auth/signup", creds);
      runInAction(() => (this.redirect = "/home"));
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "There was an issue signing up");
    } finally {
      this.loaded("signup");
    }
  }

  async signin(creds: Creds) {
    if (this.isLoading("login")) return;
    this.loading.push("login");
    const toastId = toast.loading("Authenticating...");
    try {
      const { data } = await this.api.post("auth/login", creds);
      this._setUser({ data, toastId });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "There was an issue logging in", { id: toastId });
    } finally {
      this.loaded("login");
    }
  }

  logout() {
    this.api.post("auth/logout");
    this.redirect = "/";
    this._resetState();
  }

  async resetPassword(token: string, password: string) {
    try {
      await this.api.post("auth/password/reset", { token, password });
      toast.success("Password reset success, Try login");
      this.redirect = "/login";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An issue occurred");
    }
  }
}

const instance = new State();

export { State, instance };
