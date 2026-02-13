const FALLBACK_APP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxEY8PyIZSk9irTrQBS-0TC1EM7YrUij4hCL-DM45_CY-rh2khXhXVyab-i8PwRwZJi/exec";

const APP_SCRIPT_URL =
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? FALLBACK_APP_SCRIPT_URL;

type SubmitPayload = Record<string, unknown>;

interface SubmitOptions<TPayload extends object> {
    formSlug: string;
    payload: TPayload;
}

interface SheetResponse {
    ok: boolean;
    message?: string;
    [key: string]: unknown;
}

async function submitToGoogleSheet<TPayload extends object>({
    formSlug,
    payload,
}: SubmitOptions<TPayload>): Promise<SheetResponse> {
    if (!APP_SCRIPT_URL) {
        throw new Error(
            "Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL. Add it to your environment to enable submissions."
        );
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL && FALLBACK_APP_SCRIPT_URL) {
        console.warn(
            "NEXT_PUBLIC_GOOGLE_SCRIPT_URL not set. Falling back to the default Google Apps Script endpoint."
        );
    }

    const response = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: {
            // Avoid CORS preflight (Apps Script doesn't allow OPTIONS here)
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            formSlug,
            ...(payload as SubmitPayload),
        }),
    });

    // Try to parse JSON; if not, show raw text to aid debugging
    const raw = await response.text();
    let data: SheetResponse;
    try {
        data = JSON.parse(raw) as SheetResponse;
    } catch {
        throw new Error(
            `Kon het antwoord van Google Sheets niet lezen. Server zei: ${raw?.slice(0, 300) || "(leeg)"}`
        );
    }

    if (!response.ok || !data.ok) {
        const message =
            data?.message ||
            `Google Sheets koppeling gaf een fout (${response.status}). Probeer het later opnieuw.`;
        throw new Error(message);
    }

    return data;
}

export { submitToGoogleSheet };
export type { SheetResponse };

// ────────────────────────────────────────────────────────────────────────────────
// Fund Returns CMS API
// ────────────────────────────────────────────────────────────────────────────────

const FALLBACK_FUND_RETURNS_URL =
    "https://script.google.com/macros/s/AKfycbzl1PE1ZsrGpXeitOMqEqysD2STNw11KwGYFl7VAUCQP6J0zRCl3uJZGCx9AcZqBh2GrQ/exec";

const FUND_RETURNS_SCRIPT_URL =
    process.env.NEXT_PUBLIC_FUND_RETURNS_SCRIPT_URL ?? FALLBACK_FUND_RETURNS_URL;

interface FundMonth {
    nl: string;
    en: string;
    key: string;
}

interface FundReturns {
    monthly: number;
    ytd: number;
    since_inception: number;
    cagr: number;
}

interface FundClassData {
    month: FundMonth;
    returns: FundReturns;
}

interface FundReturnsResponse {
    EC_Class_I: FundClassData | null;
    EC_Class_II: FundClassData | null;
    EC_Class_III: FundClassData | null;
}

/**
 * Fetches the latest published fund returns from the Google Sheets CMS
 */
async function fetchFundReturns(): Promise<FundReturnsResponse | null> {
    if (!FUND_RETURNS_SCRIPT_URL) {
        console.warn(
            "NEXT_PUBLIC_FUND_RETURNS_SCRIPT_URL not set. Fund returns will use fallback data."
        );
        return null;
    }

    try {
        const response = await fetch(FUND_RETURNS_SCRIPT_URL, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data as FundReturnsResponse;
    } catch (error) {
        console.error("Failed to fetch fund returns:", error);
        return null;
    }
}

export { fetchFundReturns };
export type { FundReturnsResponse, FundClassData, FundMonth, FundReturns };

// ────────────────────────────────────────────────────────────────────────────────
// Monthly Performance CMS API
// ────────────────────────────────────────────────────────────────────────────────

const MONTHLY_PERFORMANCE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzsnRH_ZhYStFiYC3P3bZuKJtJ_Cb-NOhtyhMcSj60slK3BHm4MRQNfKxwWq2-t_mIX/exec";

interface MonthlyPerformanceItem {
    month: string;
    value: number;
}

interface MonthlyPerformanceResponse {
    ok: boolean;
    data: MonthlyPerformanceItem[];
    error?: string;
}

type PerformanceStrategy = "vol_premium" | "corr_arb";

/**
 * Fetches the latest published monthly performance data from the Google Sheets CMS.
 * Pass strategy to select which table to read ("vol_premium" or "corr_arb").
 * Returns the published months, or null on failure.
 */
async function fetchMonthlyPerformance(
    strategy: PerformanceStrategy = "vol_premium"
): Promise<MonthlyPerformanceItem[] | null> {
    if (!MONTHLY_PERFORMANCE_SCRIPT_URL) {
        console.warn(
            "NEXT_PUBLIC_MONTHLY_PERFORMANCE_SCRIPT_URL not set. Monthly performance will use fallback data."
        );
        return null;
    }

    try {
        const url = `${MONTHLY_PERFORMANCE_SCRIPT_URL}?strategy=${strategy}&t=${Date.now()}`;
        const response = await fetch(url, {
            redirect: "follow",
            cache: "no-store",
        });

        const raw = await response.text();

        let data: MonthlyPerformanceResponse;
        try {
            data = JSON.parse(raw);
        } catch {
            console.error("Monthly performance: non-JSON response:", raw.slice(0, 300));
            return null;
        }

        if (!data.ok || data.error) {
            throw new Error(data.error || "Unknown error");
        }

        return data.data;
    } catch (error) {
        console.error("Failed to fetch monthly performance:", error);
        return null;
    }
}

export { fetchMonthlyPerformance };
export type { MonthlyPerformanceItem, PerformanceStrategy };

// ────────────────────────────────────────────────────────────────────────────────
// NAV Performance CMS API
// ────────────────────────────────────────────────────────────────────────────────

const NAV_PERFORMANCE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzsnRH_ZhYStFiYC3P3bZuKJtJ_Cb-NOhtyhMcSj60slK3BHm4MRQNfKxwWq2-t_mIX/exec";

interface NAVDataPoint {
    date: string;
    correlationArbitrage: number;
    volPremiumRisk: number;
    msciWorld: number;
}

interface NAVPerformanceResponse {
    ok: boolean;
    data: NAVDataPoint[];
    error?: string;
}

/**
 * Fetches NAV total return data from Google Sheets CMS.
 * Each row has date + three rebased-to-100 series values.
 * Returns all published rows, or null on failure.
 */
async function fetchNAVPerformance(): Promise<NAVDataPoint[] | null> {
    if (!NAV_PERFORMANCE_SCRIPT_URL) {
        console.warn("NAV performance script URL not set. Using fallback data.");
        return null;
    }

    try {
        const url = `${NAV_PERFORMANCE_SCRIPT_URL}?sheet=NAVPerformance&t=${Date.now()}`;
        const response = await fetch(url, {
            redirect: "follow",
            cache: "no-store",
        });

        const raw = await response.text();

        let data: NAVPerformanceResponse;
        try {
            data = JSON.parse(raw);
        } catch {
            console.error("NAV performance: non-JSON response:", raw.slice(0, 300));
            return null;
        }

        if (!data.ok || data.error) {
            throw new Error(data.error || "Unknown error");
        }

        return data.data;
    } catch (error) {
        console.error("Failed to fetch NAV performance:", error);
        return null;
    }
}

export { fetchNAVPerformance };
export type { NAVDataPoint };
