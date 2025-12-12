import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
// import { Suspense } from "react";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <PublicNavbar/>
            <main className="min-h-dvh">
                {/* <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>; */}
                {children}
            </main>
            <PublicFooter/>
        </>
    );
};

export default CommonLayout;