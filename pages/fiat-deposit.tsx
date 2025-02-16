import BankDeposit from "components/deposit/bank-deposit";
import WalletDeposit from "components/deposit/wallet-deposit";
import StripeDeposit from "components/deposit/stripe-deposit";
import {
  BANK_DEPOSIT,
  FAQ_TYPE_DEPOSIT,
  PAYPAL,
  STRIPE,
  WALLET_DEPOSIT,
  PAYSTACK,
  PAYDUNYA,
  PERFECT_MONEY,
  MOBILE_MONEY,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { currencyDeposit, currencyDepositProcess } from "service/deposit";
import SelectDeposit from "components/deposit/selectDeposit";
import DepositFaq from "components/deposit/DepositFaq";
import PaypalSection from "components/deposit/PaypalSection";
import SectionLoading from "components/common/SectionLoading";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { getFaqList } from "service/faq";
import { GetServerSideProps } from "next";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { parseCookies } from "nookies";
import Footer from "components/common/footer";
import FiatSidebar from "layout/fiat-sidebar";
import Paystack from "components/deposit/paystack";
import Paydunya from "components/deposit/paydunya";
import PerfectMoney from "components/deposit/perfectMoney";
import MobileMoney from "components/deposit/mobile-money";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import FiatHeader from "components/fiat/FiatHeader";
import PlaceTopLeft from "components/gradient/placeTopLeft";
import PlaceBottomRight from "components/gradient/placeBottomRight";
import TopLeftInnerPageCircle from "components/TopLeftInnerPageCircle";
import TopRightInnerPageCircle from "components/TopRightInnerPageCircle";
import StartTrending from "components/StartTrending";
import BottomLeftInnerPageCircle from "components/BottomLeftInnerPageCircle";
import BottomRigtInnerPageCircle from "components/BottomRigtInnerPageCircle";
import FiatSidebarTabs from "components/fiat/FiatSidebarTabs";

const Deposit = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const [faqs, setFaqs] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>({
    method: null,
    method_id: null,
  });

  const [depositInfo, setDepositInfo] = useState<any>();
  const getDepositInfo = async () => {
    setLoading(true);
    const response = await currencyDeposit();
    const responseFaq = await getFaqList();
    let tempFaq: any = [];
    responseFaq.data.data.map((faq: any) => {
      if (faq.faq_type_id === FAQ_TYPE_DEPOSIT) {
        tempFaq.push(faq);
      }
    });
    setFaqs(tempFaq);

    if (parseInt(settings.currency_deposit_faq_status) === 1) {
      setFullScreen(true);
    } else if (tempFaq.length === 0) {
      setFullScreen(true);
    }
    setDepositInfo(response.data);
    setSelectedMethod({
      method:
        response?.data?.payment_methods[0] &&
        response?.data?.payment_methods[0].payment_method,
      method_id:
        response?.data?.payment_methods[0] &&
        response?.data?.payment_methods[0].id,
    });
    setLoading(false);
  };
  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      getDepositInfo();
    }
  }, [settings]);
  useEffect(() => {
    if (!router.isReady) return;
    if (
      !router?.query?.PAYMENT_AMOUNT ||
      !router?.query?.PAYMENT_BATCH_NUM ||
      !router?.query?.PAYMENT_UNITS
    )
      return;

    convertCurrency();
  }, [router.isReady]);

  const convertCurrency = async () => {
    const wallet_id = localStorage.getItem("perfect_money_wallet_id");
    const payment_method_id = localStorage.getItem(
      "perfect_money_payment_method_id"
    );
    const amount = router?.query?.PAYMENT_AMOUNT;
    const currency = router?.query?.PAYMENT_UNITS;
    const payment_batch = router?.query?.PAYMENT_BATCH_NUM;

    const formData: any = new FormData();

    formData.append("wallet_id", wallet_id);
    formData.append("payment_method_id", payment_method_id);
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("payment_batch", payment_batch);
    const res = await currencyDepositProcess(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/user/currency-deposit-history");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className={` tradex-relative`}>
        <section className="tradex-pt-[50px] tradex-relative">
          <TopLeftInnerPageCircle />
          <TopRightInnerPageCircle />
          <div className=" tradex-container tradex-relative">
            <div className=" tradex-grid tradex-grid-cols-1 lg:tradex-grid-cols-3 tradex-gap-6">
              <FiatSidebarTabs />
              <div className=" lg:tradex-col-span-2 tradex-space-y-6">
                <div className="tradex-bg-background-main tradex-rounded-lg tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-px-4 tradex-pt-6 tradex-pb-12 tradex-space-y-6">
                  <div className=" tradex-pb-4 tradex-border-b tradex-border-background-primary tradex-space-y-4">
                    <h2 className=" tradex-text-[32px] tradex-leading-[38px] md:tradex-text-[40px] md:tradex-leading-[48px] tradex-font-bold !tradex-text-title">
                      {t("Fiat To Crypto Deposit")}
                    </h2>
                    <p className=" tradex-text-xl tradex-text-title tradex-font-bold">
                      {t(`Select method`)}
                    </p>
                  </div>
                  <SelectDeposit
                    setSelectedMethod={setSelectedMethod}
                    depositInfo={depositInfo}
                    selectedMethod={selectedMethod}
                  />
                  <div className=" tradex-grid-cols-5 tradex-gap-4">
                    <div
                      className={
                        fullScreen === false
                          ? "tradex-col-span-3"
                          : "tradex-col-span-5"
                      }
                    >
                      {!loading && !selectedMethod.method ? (
                        <div className="cp-user-title text-center  section-padding-custom">
                          <h4>{t("No Avaiable payment method")}</h4>
                        </div>
                      ) : (
                        <>
                          {parseInt(selectedMethod.method) ===
                          WALLET_DEPOSIT ? (
                            <WalletDeposit
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                            />
                          ) : parseInt(selectedMethod.method) ===
                            BANK_DEPOSIT ? (
                            <BankDeposit
                              currencyList={depositInfo.currency_list}
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                              banks={depositInfo.banks}
                            />
                          ) : parseInt(selectedMethod.method) === STRIPE ? (
                            <StripeDeposit
                              currencyList={depositInfo.currency_list}
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                              banks={depositInfo.banks}
                            />
                          ) : parseInt(selectedMethod.method) === PAYSTACK ? (
                            <Paystack
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                            />
                          ) : parseInt(selectedMethod.method) ===
                            MOBILE_MONEY ? (
                            <MobileMoney
                              currencyList={depositInfo.currency_list}
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                              mobiles={depositInfo.mobile_money_list}
                            />
                          ) : parseInt(selectedMethod.method) === PAYDUNYA ? (
                            <Paydunya
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                            />
                          ) : parseInt(selectedMethod.method) ===
                            PERFECT_MONEY ? (
                            <PerfectMoney
                              currencyList={depositInfo.currency_list}
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                              banks={depositInfo.banks}
                            />
                          ) : parseInt(selectedMethod.method) === PAYPAL ? (
                            // <PaypalButtons />
                            <PaypalSection
                              currencyList={depositInfo.currency_list}
                              walletlist={depositInfo.wallet_list}
                              method_id={selectedMethod.method_id}
                              banks={depositInfo.banks}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                    {fullScreen === false && loading === false && (
                      <div className="tradex-col-span-2">
                        <DepositFaq faqs={faqs} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StartTrending />
        <BottomLeftInnerPageCircle />
        <BottomRigtInnerPageCircle />
      </div>

      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const cookies = parseCookies(ctx);
  const commonRes = await pageAvailabilityCheck();

  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Deposit;
