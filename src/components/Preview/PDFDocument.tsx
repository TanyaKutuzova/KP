import React from 'react';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { ProposalData } from '../../types';
import { useColorSchemeTokens } from '../../context/ProposalContext';

const money = (n: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const dateRu = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('ru-RU').format(d);
};

export const PDFDocument: React.FC<{ data: ProposalData; total: number }> = ({ data, total }) => {
  const colors = useColorSchemeTokens(data.colorScheme);

  const s = StyleSheet.create({
    page: {
      paddingTop: 32,
      paddingHorizontal: 36,
      paddingBottom: 32,
      fontSize: 11,
      color: '#0f172a',
      fontFamily: 'Helvetica',
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    logo: { width: 96, height: 36, objectFit: 'contain' },
    contacts: { alignItems: 'flex-end', gap: 2 },
    contactsLine: { fontSize: 9, color: '#334155' },
    divider: { height: 2, backgroundColor: colors.primary, marginTop: 14, marginBottom: 18 },
    title: { fontSize: 22, fontWeight: 700, color: '#0b1220', lineHeight: 1.15 },
    subtitle: { marginTop: 8, fontSize: 11, color: '#334155' },
    blockTitle: { fontSize: 12, fontWeight: 700, color: '#0b1220', marginBottom: 8 },
    twoCol: { flexDirection: 'row', gap: 14, marginTop: 18 },
    col: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: '#ffffff' },
    paragraph: { fontSize: 10, color: '#334155', lineHeight: 1.4 },
    section: { marginTop: 18 },
    table: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, overflow: 'hidden' },
    trHead: { flexDirection: 'row', backgroundColor: colors.primary },
    th: { paddingVertical: 8, paddingHorizontal: 8, color: colors.textOnPrimary, fontSize: 9, fontWeight: 700 },
    tr: { flexDirection: 'row' },
    td: { paddingVertical: 7, paddingHorizontal: 8, fontSize: 9, color: '#0b1220' },
    tdMuted: { color: '#334155' },
    rowAlt: { backgroundColor: colors.mutedRow },
    totalRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10 },
    totalLabel: { fontSize: 10, color: '#334155', marginRight: 10 },
    totalValue: { fontSize: 12, fontWeight: 700, color: '#0b1220' },
    termsGrid: { flexDirection: 'row', gap: 12 },
    termCard: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12 },
    termLabel: { fontSize: 9, color: '#334155' },
    termValue: { marginTop: 4, fontSize: 12, fontWeight: 700, color: '#0b1220' },
    review: { marginTop: 14, borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 10 },
    partnerRow: { marginTop: 10, flexDirection: 'row', gap: 10 },
    partnerBox: { width: 60, height: 36, borderRadius: 8, backgroundColor: '#e2e8f0' },
    signRow: { marginTop: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    signLine: { width: 220, borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 2 },
    signText: { fontSize: 9, color: '#334155', marginTop: 4 },
  });

  const hasSecondPage =
    Boolean(data.expiryDate) ||
    Boolean(data.paymentTerms) ||
    Boolean(data.executionDays) ||
    data.showReview ||
    data.showPartners;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          {data.logo ? <Image src={data.logo} style={s.logo} /> : <View style={{ width: 96, height: 36 }} />}
          <View style={s.contacts}>
            <Text style={s.contactsLine}>{data.companyName || '—'}</Text>
            {!!data.phone && <Text style={s.contactsLine}>{data.phone}</Text>}
            {!!data.email && <Text style={s.contactsLine}>{data.email}</Text>}
            {!!data.website && <Text style={s.contactsLine}>{data.website}</Text>}
          </View>
        </View>

        <View style={s.divider} />

        <Text style={s.title}>{data.utpTitle || 'Коммерческое предложение'}</Text>
        <Text style={s.subtitle}>
          Для компании {data.clientCompany?.trim() ? data.clientCompany : '—'}
        </Text>

        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.blockTitle}>Проблема</Text>
            <Text style={s.paragraph}>{data.problemDesc?.trim() ? data.problemDesc : '—'}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.blockTitle}>Решение</Text>
            <Text style={s.paragraph}>{data.solutionDesc?.trim() ? data.solutionDesc : '—'}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.blockTitle}>Наше предложение</Text>
          <View style={s.table}>
            <View style={s.trHead}>
              <Text style={[s.th, { flex: 4 }]}>Наименование</Text>
              <Text style={[s.th, { flex: 1, textAlign: 'right' }]}>Кол-во</Text>
              <Text style={[s.th, { flex: 2, textAlign: 'right' }]}>Цена</Text>
              <Text style={[s.th, { flex: 2, textAlign: 'right' }]}>Стоимость</Text>
            </View>
            {(data.products.length ? data.products : [{ id: 'placeholder', name: '—', quantity: 1, price: 0 }]).map(
              (p, idx) => {
                const lt = p.quantity * p.price;
                return (
                  <View key={p.id} style={[s.tr, idx % 2 === 0 ? s.rowAlt : undefined]}>
                    <Text style={[s.td, { flex: 4 }]}>{p.name?.trim() ? p.name : '—'}</Text>
                    <Text style={[s.td, s.tdMuted, { flex: 1, textAlign: 'right' }]}>
                      {p.quantity}
                    </Text>
                    <Text style={[s.td, s.tdMuted, { flex: 2, textAlign: 'right' }]}>
                      {money(p.price)}
                    </Text>
                    <Text style={[s.td, { flex: 2, textAlign: 'right' }]}>{money(lt)}</Text>
                  </View>
                );
              },
            )}
          </View>
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Итого:</Text>
            <Text style={s.totalValue}>{money(total)}</Text>
          </View>
        </View>
      </Page>

      {hasSecondPage && (
        <Page size="A4" style={s.page}>
          <Text style={s.title}>Условия сотрудничества</Text>
          <View style={{ ...s.divider, marginTop: 10, marginBottom: 16 }} />

          <View style={s.termsGrid}>
            <View style={s.termCard}>
              <Text style={s.termLabel}>Срок действия предложения</Text>
              <Text style={s.termValue}>{data.expiryDate ? dateRu(data.expiryDate) : '—'}</Text>
            </View>
            <View style={s.termCard}>
              <Text style={s.termLabel}>Условия оплаты</Text>
              <Text style={s.termValue}>{data.paymentTerms || '—'}</Text>
            </View>
            <View style={s.termCard}>
              <Text style={s.termLabel}>Срок выполнения</Text>
              <Text style={s.termValue}>{data.executionDays ? `${data.executionDays} дней` : '—'}</Text>
            </View>
          </View>

          {data.showReview && (
            <View style={s.review}>
              <Text style={s.blockTitle}>Отзыв клиента</Text>
              <Text style={s.paragraph}>{data.reviewText?.trim() ? data.reviewText : '—'}</Text>
            </View>
          )}

          {data.showPartners && (
            <View style={{ marginTop: 14 }}>
              <Text style={s.blockTitle}>Партнёры</Text>
              <View style={s.partnerRow}>
                <View style={s.partnerBox} />
                <View style={s.partnerBox} />
                <View style={s.partnerBox} />
                <View style={s.partnerBox} />
              </View>
            </View>
          )}

          <View style={s.signRow}>
            <View>
              <View style={s.signLine} />
              <Text style={s.signText}>Подпись</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: '#334155' }}>Дата: {dateRu(new Date().toISOString())}</Text>
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
};

